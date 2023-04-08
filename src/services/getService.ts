const getService = async (url: string) => {
    return await (
        await fetch(
          url
        )
      ).json();
}

export default getService;