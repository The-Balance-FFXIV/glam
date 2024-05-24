from typing import Dict, List, Tuple, Optional, Final

from netlifyconfig.collection import FileCollection
from netlifyconfig.netlify import NetlifyConfig, Backend

from econfgen.collections import (
    role_metadata,
    author_profile,
    seo_tag_collection,
    generate_role_landing_file,
    generate_encounter_for,
    generate_job_guide,
    generate_fight_tips,
)


JOBS: Final[Dict[str, List[Tuple[str, str]]]] = {
    'tanks': [
        ('Paladin', 'pld'),
        ('Warrior', 'war'),
        ('Dark Knight', 'drk'),
        ('Gunbreaker', 'gbn'),
    ],
    'healers': [
        ('Scholar', 'sch'),
        ('White Mage', 'whm'),
        ('Astrologian', 'ast'),
        ('Sage', 'sge'),
    ],
    'melee': [
        ('Monk', 'mnk'),
        ('Dragoon', 'drg'),
        ('Ninja', 'nin'),
        ('Samurai', 'sam'),
        ('Reaper', 'rpr'),
    ],
    'ranged': [
        ('Bard', 'brd'),
        ('Machinist', 'mch'),
        ('Dancer', 'dnc'),
    ],
    'casters': [
        ('Black Mage', 'blm'),
        ('Red Mage', 'rdm'),
        ('Summoner', 'smn'),
    ],
}



def generate_config(backend: Backend = Backend(name='git-gateway'), local_backend: Optional[bool] = True, jobs=JOBS):
    # TODO: generate some more collections by config

    return NetlifyConfig(
        backend=backend,
        local_backend=local_backend,
        media_folder='static/img',
        public_folder='/img',
        collections=[
            role_metadata,
            author_profile,
            seo_tag_collection,
            FileCollection(
                name='role-landing',
                label='Role Landing Pages',
                files=[generate_role_landing_file(role) for role in jobs],
            ),
            generate_encounter_for(name='Pandaemonium', tier='savage'),
            generate_encounter_for(name='Ultimates', tier='ultimate'),
            generate_encounter_for(name='Extreme', tier='extreme'),  # TODO: this presents a problem with naming in the function
            *[generate_job_guide(*job, role[0]) for role in jobs.items() for job in role[1]],
            *[generate_fight_tips(*job, role[0]) for role in jobs.items() for job in role[1]],
        ],
    )
