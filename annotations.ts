/**
 * **TLDR:** Use this if you want to explicitly force consumers of your library to pass an argument as mutable.
 * 
 * Suppose we need to make it clear to our end-user that an argument passed to a function will be mutated. 
 * This is something we usually want to avoid if at all possible, but sometimes it's unavoidable. 
 * With this type, we could go:
 * 
 * ```ts
 * 
 * export function greet(items: Mutable<string[]>) {
 *      items.push("Hello!");
 * }
 * 
 * // Trying to pass in an array without any type assertion is an error, so the end-user needs to do this:
 * 
 * greet(["raindrops on roses", "whiskers on kittens"] as Mutable<string[]>);
 * 
 * ```
 */
export type Mutable<T> = T & { ___mutable: never };

/**
 * **TLDR:** Use this if you need to indicate that your function might throw an error.
 * 
 * There are a lot of options for handling errors in Typescript. When you have no other option but to throw an error instead of returning a Result type, you can use this so end-users can avoid unexpected unhandled runtime errors.
 * 
 * ```ts
 * 
 * export type Gift = {
 *    from: string;
 *    contents: string; 
 * }
 * export function unwrapGift(gifts: Gift[]): Fallible<string> {
 *      const contents = gifts.pop().contents;
 *      return contents;
 * }
 * 
 * ```
 */
export type Fallible<T> = T & { ___fallible: never };

/**
 * **TLDR:** Use this if you want to clarify that your function could return different results on different invocations.
 */
export type NonDeterministic<T> = T & { ___nondeterministic: never };