
export function dateReceivedPipe(collection) {
  const now = (new Date(Date.now())).toString();

  if (!collection.length) {
    collection.receivedDate = now;
    return collection;
  }

  return collection.map((item) => {
    item.receivedDate = now;
    return item;
  });
}
