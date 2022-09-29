// generic way of making lack of validation a type-error, not merely inconvenient.

export type ValidationFnSig<S extends string> = `___@requires_check_for_${S}`;

export type Checked<T, ValidatorNames extends string = "unknown_validator"> =
	& T
	& Record<ValidationFnSig<ValidatorNames>, never>;

export type CollapseChecks<T1, V1 extends string> = T1 extends
	Checked<infer T2, infer V2> ? Checked<T2, V1 | V2> : Checked<T1, V1>;

export type CheckerFn<T, Name extends string> = (
	a0: T,
) => a0 is CollapseChecks<Checked<T, Name>, Name>;

export const Checker = <T, N extends string>(
	_name: N,
	fn: (a0: T) => boolean,
) => {
	return {
		valid: fn as CheckerFn<T, N>,
		and: <N2 extends string>(_newname: N2, newfn: (a0: T) => boolean) =>
			Checker<T, N | N2>(_newname, (a0) => fn(a0) && newfn(a0)),
		or: <N2 extends string>(_newname: N2, newfn: (a0: T) => boolean) =>
			Checker<T, N | N2>(_newname, (a0) => fn(a0) || newfn(a0)),
	};
};
// you should be able to map over validators. oh no it's a monad now
// "and" doesn't capture the results of partial validations
// i.e if one validator succeeded, that wouldn't be reflected in the result.
// general principle: avoid erasing type information by creating convenient contexts for expressing
// functional transformations/mappings that retain the appropriate type signature

// over validators or validation results? should fn A -> B where A: 'some_valid_property' -> B: 'some_valid_property'?
// no this doesn't make sense outside of that context.
// does this signature ever get erased?
// yes - if we're passing it to a function which only expects A and not Valid<A>,
// which then returns it as an A, we lose the validation sig
// also add examples of:
// - a standalone validator function that does its thing via A as Valid<A>
// an either type whose valid or invalid paths get mapped accordingly?

// what about aliases
// what about cumulative validators?
// general problem: seeing "A is not assignable to Valid<A>" will be annoying
// to people who aren't aware of this library

// several options?
// fn A -> B becomes:
// - unchecked: fn A -> B
// - checked internally -> fn A -> Result B
// - checked externally fn Valid A -> B
// USE OVERLOADS
// no way of distinguishing btwn unchecked and checked internally via args
// Unvalidated<A>
// could rename to Checked or Unchecked
// so Validator should provide a method that wraps fns?
// how do you preserve documentation?

// imagine a h.o fn that allows the caller to decide whether the fn should:
// - throw an error - i.e, idiomatic imperative js
// - return an { ok: T, err: E } - i.e, golang
// - return an Either<T, E> - i.e haskell/rust
// - provide a constructor for successes vs failures... - i.e anything, this is cool
// - provide callbacks for err vs success - i.e idiomatic pre-promise era js
// exposing some way of granularly ignoring or substituting specific errors?
// promises?
