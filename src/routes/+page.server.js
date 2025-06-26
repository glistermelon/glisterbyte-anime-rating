import { db } from '$lib/server/db/index.js';
import { animeTable } from '$lib/server/db/schema.js';

export async function load() {

  const rows = await db.select().from(animeTable);
  let animeList = [];

  for (const row of rows) {

    let anime = { ... row };

    delete anime.id;

    anime.score = ((anime.enjoyment + anime.plot + anime.quality) / 3).toFixed(1);

    if (anime.status === null) {
      anime.statusString = "Finished";
      anime.statusColor = "var(--color-success-300)";
      anime.status = true;
    }
    else {
      anime.statusString = anime.status === -1
        ? "Dropped"
        : `Dropped during season ${anime.status}`;
      anime.statusColor = "var(--color-error-300)";
      anime.status = false;
    }

    animeList.push(anime);

  }

  animeList.sort((a, b) => a.title.localeCompare(b.title));

  return { anime: animeList };

}