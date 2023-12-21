# Cara pakai

1. Jalankan kode berikut untuk membuat database
```sh
npx sequelize-cli db:create
```

2. Migrasi database
```sh
npm migrate:up
```

3. Untuk melakukan seed
```sh
npx sequelize-cli db:seed:all
```

4. Jalankan server
```sh
npm run dev
```