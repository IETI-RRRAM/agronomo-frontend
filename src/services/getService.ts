const getService = async (url: string, options?: {} | undefined) => {
    return await (
        await fetch(
          url,
          options
        )
      ).json();
}

export default getService;