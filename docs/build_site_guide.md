
# Build Guide

To run server in developer mode:
```bash
hugo server --disableFastRender --port=1333 --buildDrafts --buildFuture
```

To build a static without starting a server:
```bash
hugo --gc --minify
```

[Hugo documentation](https://gohugo.io/commands/hugo_server/)