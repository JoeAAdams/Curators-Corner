# Curators-Corner
https://curators-corner.netlify.app/
---

### Linux installation

in your console

```
mkdir Curators-corner
cd Curators-corner
git init
git pull https://github.com/JoeAAdams/Curators-Corner.git
npm install -d
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
