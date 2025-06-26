<script lang="js">
    export let data;
    export let form;
    import { FileUpload } from '@skeletonlabs/skeleton-svelte';
</script>

<form method="POST" class="new-anime-form" action="?/new">
    <div class="flex">
        <input name="title" type="text" class="input" placeholder="title" />
    </div>
    <div style="display: flex;">
        <input name="enjoyment" type="number" class="input" placeholder="enjoyment" min="0" max="10" />
        <input name="plot" type="number" class="input" placeholder="plot" min="0" max="10" />
        <input name="quality" type="number" class="input" placeholder="quality" min="0" max="10" />
    </div>
    <div style="display: flex; gap: 0.5rem; align-items: center;">
        <input class="radio" type="radio" checked name="status" value="finished" />
        <div>Finished</div>
    </div>
    <div style="display: flex; gap: 0.5rem; align-items: center; max-width: 20rem;">
        <input class="radio" type="radio" checked name="status" value="dropped" />
        <div>Dropped</div>
        <input name="season" type="number" class="input" placeholder="season" />
    </div>
    <div class="flex">
        <input name="image-url" type="text" class="input" placeholder="image url" />
    </div>
    <FileUpload name="image" accept="image/*" maxFiles={1} />
    <div class="flex">
        <textarea name="notes" class="textarea" rows="8" placeholder="notes" style="resize: none;" ></textarea>
    </div>
    <div class="flex">
        <input name="password" type="password" class="input" placeholder="password" />
    </div>
    <div class="flex">
        <button type="submit" class="btn preset-filled-primary-500 w-full">Submit</button>
    </div>
    <div style="text-align: center;">
        {#if form?.success}
            success
        {:else if form?.error}
            error: {form.error}
        {/if}
    </div>
</form>