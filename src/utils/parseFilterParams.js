function parseFavourite(value) {
  const isValue = typeof value === 'string';
  if (!isValue) return;

  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;

  return;
}

function parseContactType(value) {
  const isString = typeof value === 'string';
  if (!isString) return;

  const isContactType = (value) => ['work', 'home', 'personal'].includes(value);

  if (isContactType(value)) return value;
}

export function parseFilterParams(query) {
  const { isFavourite, contactType } = query;

  const parsedIsFavourite = parseFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
}
