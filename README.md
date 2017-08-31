## Coingraphs
Coingraphs is an **hackable cryptocoin graph builder**.

<table>
    <tr>
        <th>Version</th>
        <td>0.1 beta</td>
    <tr/>
    <tr>
        <th>GitHub</th>
        <td><a href="https://github.com/derogab/coingraphs">https://github.com/derogab/coingraphs</a></td>
     <tr/> 
    <tr>
       <th>Author</th>
       <td><a href="https://github.com/derogab/">Gabriele De Rosa</a> (<a href="https://twitter.com/derogab">@derogab</a>)</td>
    </tr>
    <tr>
        <th>Copyleft</th>
        <td>Gabriele De Rosa</td>
    </tr>
</table>

**Dependencies**
```shell
# Install dependencies
sudo apt-get install apache2 php5 libapache2-mod-php5 php5-mcrypt mysql-server php5-mysql python python3
# Install python dependencies
pip install json requests sys time
```

**Download**

```shell
# Open the apache folder
cd /var/www/
# Clone the repo
git clone https://github.com/derogab/coingraphs
```

**Configuration**

Open `getdata.php` and `getdata.py` to customize mysql db connection.

**Cronjob**

Insert a cronjob. You can edit your cronjob list by writing `crontab -e`. 
```
*/1 * * * * /usr/bin/python /var/www/coingraphs/getdata.py
```

**Usage**

Open browser to `http://localhost/coingraphs` to view real-time graphs.