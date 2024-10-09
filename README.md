# Curators-Corner

Curators corner is an app that allows the user to browse exhibits from Harvard University and Cleveland Art Museum using their public API's using search terms and dates of creation, then add exhibits they choose to their own personal gallery.

Link to hosted website: https://curators-corner.netlify.app/
---

### Linux installation

```Node.js v21.2.0```

in your console type

```
- mkdir Curators-corner
- cd Curators-corner
- git init
- git pull https://github.com/JoeAAdams/Curators-Corner.git
- npm install -d
```

create a folder called .env.local and put inside:

```
VITE_HARVARD_KEY=[your-harvard-api-key]
```

you will have to aquire the key your self from: https://harvardartmuseums.org/collections/api

### Run

```
npm run dev
```
