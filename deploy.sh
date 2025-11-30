#!/bin/bash

echo "🚀 국가 자동화 플랫폼 배포 스크립트"
echo "================================"
echo ""

# 1. 파일 복사
echo "📁 파일 복사 중..."
sudo mkdir -p /var/www/government-ai-systems
sudo cp -r * /var/www/government-ai-systems/
echo "✅ 파일 복사 완료"
echo ""

# 2. 권한 설정
echo "🔐 권한 설정 중..."
sudo chown -R www-data:www-data /var/www/government-ai-systems
sudo chmod -R 755 /var/www/government-ai-systems
echo "✅ 권한 설정 완료"
echo ""

# 3. Nginx 설정
echo "⚙️  Nginx 설정 중..."
if [ ! -f /etc/nginx/sites-available/gov-ai-portal ]; then
    echo "Nginx 설정 파일이 없습니다. README.md의 4️⃣ 단계를 참조하세요."
else
    sudo nginx -t && sudo systemctl restart nginx
    echo "✅ Nginx 재시작 완료"
fi
echo ""

# 4. 완료
echo "🎉 배포 완료!"
echo ""
echo "접속 URL:"
echo "  - 포털: http://YOUR_IP/portal/"
echo "  - 행정부: http://YOUR_IP/portal/government.html"
echo "  - 체제 자동화: http://YOUR_IP/portal/systems.html"
echo ""
