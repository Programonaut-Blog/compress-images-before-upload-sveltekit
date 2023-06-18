<script lang="ts">
    import Compressor from "compressorjs";

    let files: FileList;

    function compressImage(e: Event) {
        const filesFromElement = (e.target as HTMLInputElement).files;

        if (!filesFromElement) return;
        console.log(filesFromElement);

        for (let i = 0; i < filesFromElement.length; i++) {
            new Compressor(filesFromElement[i], {
                quality: 0.6,
                width: 2048,
                height: 2048,
                resize: "cover",
                success(result: File | Blob) {
                    let file: File;
                    let name = (result as File).name;
                    let type = (result as File).type;
    
                    if (result instanceof Blob) {
                        file = new File([result], "compressed_" + name, { type });
                        console.log(file);
                    } else {
                        file = result as File;
                    }
                    
                    const dt = new DataTransfer();
                    dt.items.add(file);
                    if (filesFromElement) {
                        for (let i = 1; i < filesFromElement.length; i++) {
                            dt.items.add(filesFromElement[i]);
                        }
                    }
                    files = dt.files;
                },
    
                error(err: Error) {
                    console.log(err.message);
                },
            });
        }

    }
</script>

<main class="container" style="padding-top: 32px;">
    <h1>Image Upload with compression</h1>
    <form action="?/upload" method="POST">
        <input type="file" name="file" multiple accept="image/*" bind:files on:change={compressImage}/>
        <button type="submit">Upload</button>
    </form>
</main>
