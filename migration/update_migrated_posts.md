# Script to migrate content

### error
```r
blog → 2023-07-02-the-future-of-urban-ai/index.md frontmatter does not match collection schema.
description: Required
pubDate: Invalid date
Image DALL·E-2023-07-03-13.37.50-A-futuristic-city-of-medium-rise-buildings-with-bio-inspired-architecture-photorealistic.png does not exist. Is the path correct?
```

### source format
```
---
title: "New York's \"Beautiful Mosaic\" of Urban Tech"
date: 2023-07-02
categories: 
  - "planning"
tags: 
  - "report"
coverImage: "Screenshot-2023-07-04-at-4.13.24-PM.png"
---
```

### source path
`migration/output/posts`

### Destination format
```
---
title: 'Third post: How to become a succesful software developer'
slug: 'third-post'
description: 'Lorem ipsum dolor sit amet'
tags: ["Adaptation"]
pubDate: 'Jul 22 2022'
coverImage: './blog-placeholder-3.jpg'
---
```

### destination path
`src/content/blog`

### Example of fixed, verified update of source to destination

```
---
title: "The Future of Urban AI"
pubDate: 'Jul 02 2023'
description: ""
categories: 
  - "planning"
tags: 
  - "report"
coverImage: "./images/DALL·E-2023-07-03-13.37.50-A-futuristic-city-of-medium-rise-buildings-with-bio-inspired-architecture-photorealistic.png"
---
```