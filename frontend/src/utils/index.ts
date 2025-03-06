export function joinPaths(...paths: string[]): string {
  return paths
    .map((part, index) => {
      if (index === 0) {
        return part.trim().replace(/[/]*$/g, "");
      } else {
        return part.trim().replace(/(^[/]*|[/]*$)/g, "");
      }
    })
    .filter((part) => part.length)
    .join("/");
}

export function getAPIUrl(path?: string): string {
  return joinPaths("http://localhost:8164", path || "");
}
