# _ADAPTY.test_

Host: http://localhost:8025 \
PHPMySQL: http://localhost:8026 \
Access:
CAP: http://localhost:8025/wp-admin/ \
Login: `adaptystrator` \
Password: `adaptystrator` 

### *Run project:*
After start, set permission in terminal:
```bush
export VM_UID=$(id -u)
export VM_GID=$(id -g)
```
```bash
docker-compose up --build
```
or all commands in one line:
```bash
export VM_UID=$(id -u) && export VM_GID=$(id -g) && docker-compose up -d
```

## ***Problem-solving:***
Permission denied:
```apacheconf
sudo chown -R $USER:www-data wordpress
```

Open FTP (for update):
```php
define('FS_METHOD', 'direct'); // wp-config.php
```
