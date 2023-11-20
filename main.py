from fastapi import FastAPI, File, UploadFile

app = FastAPI()

@app.post("/uploadfile")
async def create_upload_file(file:UploadFile = File(...)):
    if not file:
        return {"message":"파일이 존재하지 않음"}
    else:
        upload_folder = "uploads"
        file_path = f"{upload_folder}/{file.filename}"

        with open(file_path,"wb") as f:
            f.write(file.file())
        return {"good job"}
    
        # f = open("file.png","wb")
        # f.write(await file.read())
        # f.close