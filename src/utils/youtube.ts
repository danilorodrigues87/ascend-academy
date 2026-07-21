/** Extrai ID e monta URL embed do YouTube. */
export function youtubeVideoId(url: string): string | null {
  const u = (url || "").trim();
  if (!u) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(u)) return u;
  const m = u.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return m?.[1] ?? null;
}

export function toYoutubeEmbed(url: string): string | null {
  const id = youtubeVideoId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function youtubeEmbedSrc(url: string, params = "rel=0&modestbranding=1"): string | null {
  const embed = toYoutubeEmbed(url);
  if (!embed) return null;
  return embed.includes("?") ? `${embed}&${params}` : `${embed}?${params}`;
}
