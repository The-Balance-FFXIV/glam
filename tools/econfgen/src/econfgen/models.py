from typing import Dict, List, Tuple, Optional, Literal

from pydantic import BaseSettings, BaseModel
from netlifyconfig.netlify import Backend


class Environment(BaseModel):
    backend: Backend
    local_backend: Optional[bool] = None
    publish_mode: Optional[Literal['simple', 'editorial_workflow']] = None
    site_url: Optional[str] = None
    show_preview_links: Optional[bool] = None
    jobs: Dict[str, List[Tuple[str, str]]]


class OverrideableEnvironment(BaseModel):
    backend: Optional[Backend]
    local_backend: Optional[bool]
    jobs: Optional[Dict[str, List[Tuple[str, str]]]]


class Config(BaseSettings):
    default: Environment
    prod: Optional[OverrideableEnvironment]
