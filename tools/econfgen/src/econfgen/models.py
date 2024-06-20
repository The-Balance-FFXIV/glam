from typing import Dict, List, Tuple, Optional, Literal

from pydantic import BaseSettings, BaseModel
from netlifyconfig.netlify import Backend

PUBLISH_MODES = Literal['simple', 'editorial_workflow']


class Environment(BaseModel):
    backend: Backend
    local_backend: Optional[bool] = None
    publish_mode: Optional[PUBLISH_MODES] = None
    site_url: Optional[str] = None
    show_preview_links: Optional[bool] = None
    jobs: Dict[str, List[Tuple[str, str]]]


class OverrideableEnvironment(BaseModel):
    backend: Optional[Backend]
    local_backend: Optional[bool]
    publish_mode: Optional[PUBLISH_MODES] = None
    site_url: Optional[str] = None
    show_preview_links: Optional[bool] = None
    jobs: Optional[Dict[str, List[Tuple[str, str]]]]


class Config(BaseSettings):
    default: Environment
    prod: Optional[OverrideableEnvironment]
