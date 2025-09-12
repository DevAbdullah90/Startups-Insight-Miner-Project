from fastapi import FastAPI
from pydantic import BaseModel
from market_agent import run_market_agent
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MarketResearchRequest(BaseModel):
    niche: str
    region: str
    audience: str

@app.post("/analyze/")
async def analyze_market(data: MarketResearchRequest):
    result = await run_market_agent(data.niche, data.region, data.audience)
    return {"report": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
