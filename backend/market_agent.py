from agents import Agent, Runner
from connection import config



competitor_research= Agent(
    name="Competitor Research",
    instructions="""
        You are a competitor research analyst. Your goal is to identify the top 5 competitors in the market.
    """
)

agent = Agent(
    name="Market Research Analyst",
    instructions="""
        You are a market research analyst. Your goal is to analyze any niche and region, 
        identify industry trends, TAM, key competitors, and provide a SWOT analysis 
        in professional business tone. you also have to handsoff for your multi agents
    """,
    handoffs=[competitor_research]
)

async def run_market_agent(niche, region, audience):
    prompt = f"""
    Analyze the following:
    - Niche: {niche}
    - Region: {region}
    - Audience: {audience}
    
    Output a detailed business report including:
    1. Industry trends
    2. TAM (Total Addressable Market)
    3. Top 5 competitors
    4. SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats)
    """
    result = await Runner.run(agent, input=prompt, run_config=config)
    return result.final_output
    


