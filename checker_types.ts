export type ValidationFnSig<S extends string> = `___@requires_check_for_${S}`;

export type Checked<T, ValidatorNames extends string = "unknown_validator"> =
	& T
	& Record<ValidationFnSig<ValidatorNames>, never>;

export type CollapseChecks<T1, V1 extends string> = T1 extends
	Checked<infer T2, infer V2> ? Checked<T2, V1 | V2> : Checked<T1, V1>;

export type CheckerFn<T, Name extends string> = (
	a0: T,
) => a0 is CollapseChecks<Checked<T, Name>, Name>;