#!/bin/bash

# 停止容器
docker compose down

# 配置
image_name="jiang103/server:v2.2.0"
new_image_name="jiang103/server:new"


# 启动容器
container_id=$(docker run -d $image_name tail -f /dev/null)
echo "容器已启动，ID为：$container_id"

# 进入容器修改文件
docker exec -it $container_id /bin/bash
cd /opt/venv/lib64/python3.8/site-packages/django/conf
# sed -i 's/ACCOUNT_AUTHENTICATION_METHOD = 'username_email'/new_string/g' global_settings.py

exit
echo "已修改文件"

# 保存容器为新镜像
docker commit $container_id $new_image_name
echo "已保存新镜像：$new_image_name"

# 关闭容器
docker rm -f $container_id
echo "关闭容器"

# 删除旧镜像
docker rmi $image_name
echo "删除旧镜像：$image_name"

# 重命名新镜像
docker tag $new_image_name $image_name
echo "重命名镜像：$new_image_name 为 $image_name"