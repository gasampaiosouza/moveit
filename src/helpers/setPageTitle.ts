const setPageTitle = (title: string) => {
  if (!title) return;

  return document.title = title;
}

export default setPageTitle;