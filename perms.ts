export type Permissions =
	| "allow-env"
	| "allow-system"
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
		[K in keyof Perms]: Record<
			`___@requires_permission_${Perms[K]}`,
			never
		>;
	};

export type PermissionsFor<T> = T extends NeedsPermission<unknown, infer Perms> ? Perms: never;