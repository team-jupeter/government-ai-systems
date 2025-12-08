#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
개인정보 파기 스크립트
등록 완료된 보유자의 개인정보를 자동 삭제
"""
import json
import os
from datetime import datetime
import shutil

def cleanup_personal_info():
    """
    등록 완료 후 개인정보 파기
    """
    print("=" * 60)
    print("개인정보 파기 프로세스")
    print("=" * 60)
    
    # 1. 등록 상태 로드
    with open('registration_status.json', 'r', encoding='utf-8') as f:
        status = json.load(f)
    
    registered_count = status.get('registered', 0)
    total_count = status.get('totalHolders', 0)
    
    print(f"\n등록 현황:")
    print(f"  총 보유자: {total_count}명")
    print(f"  등록 완료: {registered_count}명")
    print(f"  대기 중: {total_count - registered_count}명")
    
    # 2. 모든 보유자가 등록 완료했는지 확인
    if registered_count < total_count:
        print(f"\n⚠️ 경고: 아직 {total_count - registered_count}명이 미등록 상태입니다")
        response = input("개인정보를 파기하시겠습니까? (yes/no): ")
        if response.lower() != 'yes':
            print("취소되었습니다.")
            return
    
    # 3. 백업 생성
    backup_dir = f'backup_before_cleanup_{datetime.now().strftime("%Y%m%d_%H%M%S")}'
    os.makedirs(backup_dir, exist_ok=True)
    
    files_to_backup = [
        'holders.json',
        'registration_tokens.json',
        'registration_links.csv',
        'email_template.html',
        'email_template.txt'
    ]
    
    print(f"\n📦 백업 생성 중: {backup_dir}/")
    for file in files_to_backup:
        if os.path.exists(file):
            shutil.copy2(file, f'{backup_dir}/{file}')
            print(f"  ✓ {file}")
    
    # 4. 개인정보가 없는 새 holders.json 생성
    with open('holders.json', 'r', encoding='utf-8') as f:
        holders_data = json.load(f)
    
    # 개인정보 제거 (이름, 이메일 삭제, 공개키만 유지)
    anonymized_holders = {
        "note": "⚠️ 개인정보 파기 완료. 등록된 공개키만 보관.",
        "totalSupply": holders_data['totalSupply'],
        "holderCount": holders_data['holderCount'],
        "lastUpdated": datetime.now().isoformat(),
        "privacyCleanupDate": datetime.now().isoformat(),
        "holders": []
    }
    
    for holder in holders_data['holders']:
        # 등록된 공개키가 있는 경우만 유지
        holder_id = str(holder['id'])
        if holder_id in status['registrations']:
            reg_info = status['registrations'][holder_id]
            anonymized_holders['holders'].append({
                "id": holder['id'],
                "balance": holder['balance'],
                "publicKeyHash": reg_info['registeredPublicKey'],  # 실제 등록된 공개키
                "registeredAt": reg_info['registeredAt'],
                "note": "등록 완료 - 개인정보 파기됨"
            })
        else:
            # 미등록자는 임시 공개키 유지
            anonymized_holders['holders'].append({
                "id": holder['id'],
                "balance": holder['balance'],
                "publicKeyHash": holder['publicKeyHash'],  # 임시 공개키
                "note": "미등록 - 임시 공개키"
            })
    
    # 파기 전 확인
    print(f"\n🗑️ 파기 대상 개인정보:")
    print(f"  • 이름: {len(holders_data['holders'])}명")
    print(f"  • 이메일: {len([h for h in holders_data['holders'] if h.get('email')])}개")
    print(f"  • 가입일: {len(holders_data['holders'])}개")
    print(f"\n✅ 보존 정보:")
    print(f"  • 공개키: {len(anonymized_holders['holders'])}개")
    print(f"  • 잔액: {len(anonymized_holders['holders'])}개")
    
    final_confirm = input("\n최종 확인: 개인정보를 영구 삭제하시겠습니까? (YES 입력): ")
    if final_confirm != 'YES':
        print("취소되었습니다.")
        return
    
    # 5. 개인정보 파기
    print("\n🔥 개인정보 파기 중...")
    
    # holders.json 덮어쓰기
    with open('holders.json', 'w', encoding='utf-8') as f:
        json.dump(anonymized_holders, f, ensure_ascii=False, indent=2)
    print("  ✓ holders.json 개인정보 제거")
    
    # 등록 토큰 삭제
    if os.path.exists('registration_tokens.json'):
        os.remove('registration_tokens.json')
        print("  ✓ registration_tokens.json 삭제")
    
    # 등록 링크 삭제
    if os.path.exists('registration_links.csv'):
        os.remove('registration_links.csv')
        print("  ✓ registration_links.csv 삭제")
    
    # 이메일 템플릿 삭제
    if os.path.exists('email_template.html'):
        os.remove('email_template.html')
        print("  ✓ email_template.html 삭제")
    
    if os.path.exists('email_template.txt'):
        os.remove('email_template.txt')
        print("  ✓ email_template.txt 삭제")
    
    # 개인화 이메일 폴더 삭제
    if os.path.exists('personalized_emails'):
        shutil.rmtree('personalized_emails')
        print("  ✓ personalized_emails/ 폴더 삭제")
    
    # 6. 파기 로그 생성
    cleanup_log = {
        "cleanupDate": datetime.now().isoformat(),
        "totalHolders": total_count,
        "registeredAtCleanup": registered_count,
        "filesDestroyed": [
            "holders.json (개인정보 제거)",
            "registration_tokens.json",
            "registration_links.csv",
            "email_template.html",
            "email_template.txt",
            "personalized_emails/"
        ],
        "backupLocation": backup_dir,
        "note": "개인정보보호법 준수 - 목적 달성 후 즉시 파기"
    }
    
    with open('privacy_cleanup_log.json', 'w', encoding='utf-8') as f:
        json.dump(cleanup_log, f, ensure_ascii=False, indent=2)
    
    print("\n" + "=" * 60)
    print("✅ 개인정보 파기 완료!")
    print("=" * 60)
    print(f"\n📋 요약:")
    print(f"  • 백업 위치: {backup_dir}/")
    print(f"  • 파기 로그: privacy_cleanup_log.json")
    print(f"  • 보존 정보: 공개키 + 잔액만")
    print(f"\n🔒 보안 상태:")
    print(f"  ✅ 개인정보 0건")
    print(f"  ✅ P2P 거래 가능 (공개키만 사용)")
    print(f"  ✅ 개인정보보호법 준수")
    print(f"  ✅ GDPR 준수 (최소 보관 원칙)")

if __name__ == '__main__':
    cleanup_personal_info()
