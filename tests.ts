import { Valid, Validator } from "./valid.ts";

Deno.test(() => {
	type BookName = string;

	type LibraryRequest = {
		book: BookName;
		loanDuration: number;
	};

	// let's make sure that we log all valid requests...

	const logValidRequests = (
		req: Valid<LibraryRequest, "positiveLoanDuration" | "bookAvailable">,
	) => {
		console.log("Valid request was made: ", req);
	};

	const library = [
		"Capital",
		"The Communist Manifesto",
		"The German Ideology",
	];

	// and we'll make sure they're valid using this:

	const libraryValidator = Validator(
		"bookAvailable",
		(req: LibraryRequest) => library.includes(req.book),
	).and(
		"positiveLoanDuration",
		(req) => req.loanDuration > 0,
	);

	const myRequest = {
		book: "Atlas Shrugged",
		// naturally, we would only request atlas shrugged if we weren't serious, so:
		loanDuration: -1,
	};

	// logValidRequests(myRequest);

	// returns:
	// Argument of type '{ book: string; loanDuration: number; }' is not assignable to parameter of type 'Valid<LibraryRequest>'.

	if (libraryValidator.valid(myRequest)) {
		logValidRequests(myRequest);
	}

	// if (!libraryValidator.valid(myRequest)) {
	//    logValidRequests(myRequest);
	// }
	// another type error I can't be bothered copy-pasting
});
