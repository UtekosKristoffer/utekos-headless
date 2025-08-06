

const getCachedUser = unstable_cache(
  async () => {
    return getUserById(userId)
  },
  [CartId],
  {
    tags: ['user'],
    revalidate: 3600,
  }
)