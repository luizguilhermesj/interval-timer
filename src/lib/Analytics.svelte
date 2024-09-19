<script lang="ts">
    import { page } from '$app/stores'
    import { browser } from '$app/environment';
    const ID = 'G-6VKJKRM18Y';
  
    $effect(() => {
        if (!browser || gtag == undefined) return
        gtag('config', ID, {
            page_title: document.title,
            page_path: $page.url.pathname,
        })
    })
</script>

<svelte:head>
    <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${ID}`}>
    </script>
    <script>
        window.dataLayer = window.dataLayer || []

        function gtag() {
        dataLayer.push(arguments)
        }

        gtag('js', new Date())
        gtag('config', ID)
    </script>
</svelte:head>
  