/**
 * Replaces `{key}` placeholders in a template string with provided values.
 *
 * @param template The template string containing `{key}` placeholders.
 * @param vars An object mapping keys to string or number values.
 * @returns The interpolated string.
 */
export const fill = (
  template: string,
  vars: Record<string, string | number>
): string =>
  Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value)),
    template
  );
