# ScanClick Platform

ระบบ Node.js แบบ local-first สำหรับ API สนทนาและหน้าเว็บสาธารณะ

## เริ่มใช้งาน

```bash
npm install
SCANCLICK_API_KEY=change-me npm start
```

เรียกใช้งาน:

```bash
curl http://localhost:3000/health
curl -X POST http://localhost:3000/api/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"api_key":"change-me","messages":[{"role":"user","content":"สวัสดี"}]}'
```

## Environment variables

- `SCANCLICK_API_KEY` — API key ที่ต้องตั้งเอง ห้าม commit ลง repository
- `SCANCLICK_RATE_LIMIT` — จำนวน request ต่อช่วงเวลา (ค่าเริ่มต้น 60)
- `SCANCLICK_RATE_WINDOW_MS` — ช่วงเวลาจำกัด rate (ค่าเริ่มต้น 60000 ms)
- `SCANCLICK_TOKEN_LIMIT` — จำนวน token/request สูงสุดใน process นี้
- `PORT` — port ของเซิร์ฟเวอร์

ระบบไม่สร้างหรือแสดง token ลับอัตโนมัติ และไม่ deploy production โดยไม่มีการตั้งค่าและอนุมัติจากเจ้าของระบบ
