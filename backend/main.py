from fastapi import FastAPI

# Initialize app
app = FastAPI()

# Create a route
@app.get("/")
async def root():
    return {"message": "Hello World"}

# Create another endpoint
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}