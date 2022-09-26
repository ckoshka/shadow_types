// generic way of making lack of validation a type-error, not merely inconvenient.

export type ValidationFnSig<S extends string> =
	`___@requires_${S}`;

export type Valid<T, ValidatorNames extends string = "any"> = T & Record<ValidationFnSig<ValidatorNames>, never>;
export type CollapseValids<T1, V1 extends string> = T1 extends
	Valid<infer T2, infer V2> ? Valid<T2, V1 | V2> : Valid<T1, V1>;

export type ValidatorFn<T, Name extends string> = (
	a0: T,
) => a0 is CollapseValids<Valid<T, Name>, Name>;

export const Validator = <T, N extends string>(
	_name: N,
	fn: (a0: T) => boolean,
) => {
	return {
		valid: fn as ValidatorFn<T, N>,
		and: <N2 extends string>(_newname: N2, newfn: (a0: T) => boolean) =>
			Validator<T, N | N2>(_newname, (a0) => fn(a0) && newfn(a0)),
		or: <N2 extends string>(_newname: N2, newfn: (a0: T) => boolean) =>
			Validator<T, N | N2>(_newname, (a0) => fn(a0) || newfn(a0)),
	};
};
// you should be able to map over validators. oh no it's a monad now
// could we make it so that different validator fns get reflected in the type signature when different kinds of validation are needed?
// that would be more powerful, but slightly more annoying.
// an either type whose valid or invalid paths get mapped accordingly?
