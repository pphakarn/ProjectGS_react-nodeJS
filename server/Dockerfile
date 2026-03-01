FROM node:18-alpine
WORKDIR /app

# 1. ลง Library ที่จำเป็นก่อน
COPY package*.json ./
RUN npm install

# 2. ก๊อปปี้ไฟล์ทั้งหมด (รวมถึงโฟลเดอร์ prisma) เข้าไปใน Container
COPY . .

# 3. สร้าง Prisma Client (อันนี้คือส่วนที่ขาดไป!)
RUN npx prisma generate

EXPOSE 5000

# 4. รันแอป
CMD ["node", "server.js"]