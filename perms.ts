export type Permissions =
	| "allow-env"
	| "allow-hrtime"
	| "allow-net"
	| "allow-ffi"
	| "allow-read"
	| "allow-run"
	| "allow-write"
	| "allow-all";

export type NeedsPermission<T, Perms extends Permissions[]> =
	& T
	& {
		[K in keyof Perms & string]: Record<
			`___@requires_permission_${K}`,
			never
		>;
	};

export type PermissionsFor<T> = T extends NeedsPermission<unknown, infer Perms> ? Perms: never;