#!/bin/sh

make -B dist

cat - >index.html <<EOF
<!doctype html>
  <html>
    <body>
EOF

for file in `find dist django_bookmarks.egg-info -type f`; do
    printf '      <a href="%s">%s</a>\n' $file $file >> index.html
done

cat - >>index.html <<EOF
  </body>
</html>
EOF

rsync -e 'ssh -p 5000' -rv --delete dist django_bookmarks.egg-info index.html \
      edtwardy@192.168.1.60:/var/www/edtwardy.hopto.org/pypi/django-bookmarks/
