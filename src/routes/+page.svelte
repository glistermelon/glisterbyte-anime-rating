<script>
    export let data;
</script>

<!DOCTYPE html>
<head>
    <title>Anime Ratings</title>
</head>
<body>
    <div class="anime-boxes">
        {#each data.anime as anime}
        <div class="anime-box anime-box-{anime.status ? 'finished' : 'dropped'}">
            <div>
                <img src={`/uploads/${anime.image}`} alt="portrait" class="portrait">
                <div>
                    <h1>
                        {anime.title}
                        <span class="status-separator">•</span>
                        <span style="color: {anime.statusColor}">{anime.statusString}</span>
                    </h1>
                    <div class="score">
                        <div>{anime.score}</div>
                        <div>
                            <div>enjoyment</div>
                            <div>{anime.enjoyment}</div>
                        </div>
                        <div>
                            <div>plot</div>
                            <div>{anime.plot}</div>
                        </div>
                        <div>
                            <div>quality</div>
                            <div>{anime.quality}</div>
                        </div>
                    </div>
                    {#if anime.notes !== null}
                        <div class="notes-label">Notes</div>
                        <div class="notes">{anime.notes}</div>
                    {/if}
                </div>
            </div>
        </div>
        {/each}
    </div>
</body>