#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EGCT 초기 데이터 생성 스크립트 (예시)
실제 사용 시: 이 파일을 generate_initial_data.py로 복사 후 실제 데이터 입력
"""
import json
import hashlib
import secrets
from datetime import datetime, timedelta

# ⚠️ 예시 데이터 (실제 사용 시 교체 필요)
holders_data = [
    {"name": "보유자_A", "egct": 30000, "email": "holder_a@example.com", "date": "2018-03-01"},
    {"name": "보유자_B", "egct": 10000, "email": "holder_b@example.com", "date": "2018-03-05"},
    {"name": "보유자_C", "egct": 5000, "email": "holder_c@example.com", "date": "2018-03-10"},
    {"name": "보유자_D", "egct": 5000, "email": "holder_d@example.com", "date": "2018-03-15"},
    {"name": "보유자_E", "egct": 5000, "email": "holder_e@example.com", "date": "2018-04-01"},
    # ... 실제 보유자 데이터 추가 ...
]

print("=" * 60)
print("⚠️  이것은 예시 템플릿입니다")
print("=" * 60)
print("\n사용 방법:")
print("1. 이 파일을 generate_initial_data.py로 복사")
print("2. holders_data를 실제 CSV 데이터로 교체")
print("3. python3 generate_initial_data.py 실행")
print("\n⚠️  generate_initial_data.py는 .gitignore에 포함됨")
print("=" * 60)

# 이하 동일한 로직...
# (실제 코드는 아래 참조)
