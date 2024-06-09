from typing import Dict, List, Tuple, Optional

from pydantic import BaseSettings, BaseModel
from netlifyconfig.netlify import Backend


class Environment(BaseModel):
    backend: Backend
    local_backend: Optional[bool] = None
    jobs: Dict[str, List[Tuple[str, str]]]


class OverrideableEnvironment(BaseModel):
    backend: Optional[Backend]
    local_backend: Optional[bool]
    jobs: Optional[Dict[str, List[Tuple[str, str]]]]


class Config(BaseSettings):
    default: Environment
    prod: Optional[OverrideableEnvironment]
