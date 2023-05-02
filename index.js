import express from "express";
import bodyParser from "body-parser";
import db from "./connection.js";
import response from "./response.js";

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    db.query("SELECT * FROM buku", (error, result) => {
        response(200, result, "semua  data", res)
    })
})

app.get('/test/:id_buku', (req, res) => {
    const id_buku = req.params.id_buku
    const sql = `SELECT * FROM buku WHERE id_buku = ${id_buku}`
    db.query(sql, (err, field) => {
        if(err) throw err
        response(200, field, "detail buku", res)
    })
    
})

app.post('/test', (req, res) => {
    const { id_buku, judul, id_penerbit, tgl_terbit, harga, status, stok } = req.body

    console.log(req.body)
    const sql = `INSERT INTO buku (id_buku, judul, id_penerbit, tgl_terbit, harga, status, stok) VALUES ('${id_buku}',
    '${judul}','${id_penerbit}', '${tgl_terbit}', '${harga}', '${status}', '${stok}')`

    db.query(sql, (err, field) => {
        console.log(field)
        if(err) response(500, "ID buku Sudah Ada", "Error",res)
        if(field?.affectedRows) {
            const data= {
                isSuccess: field.affectedRows
            }
        response(200, data, "Data Di Tambahkan", res)
        }

    })
})

app.put('/test', (req, res) => {
    const { id_buku, judul, id_penerbit, tgl_terbit, harga, status, stok } = req.body
    const sql = `UPDATE buku SET judul = '${judul}', id_penerbit = '${id_penerbit}', tgl_terbit = '${tgl_terbit}', 
    harga = '${harga}', status = '${status}', stok = '${stok}' WHERE id_buku = '${id_buku}'`

    db.query(sql, (err, field) => {
        console.info(field)
        if(err) response(500, "salah", "error", res)
        if(field?.affectedRows){
            const data= {
                isSuccess: field.affectedRows,
                message: field.message
            }
            response(200, data, "Data Berasil Di Ubah", res)
        }else{
            response(500, "salah", res)
        }
    })

})

app.delete('/test', (req, res) => {
    const { id_buku } = req.body
    const sql = `DELETE FROM buku WHERE id_buku = ${id_buku}`

    db.query(sql, (err, field) => {
        if(err) response(500, "Invalid", "error", res)
        if(field?.affectedRows){
            const data= {
                isDelete: field.affectedRows,
            }
            response(200, data, "Data Berasil Di Hapus", res)
        }else{
            response(500, "Invalid", "salah", res)
        }
    })
})



app.listen(3000, () => {
    console.log("server is running.......")
})


