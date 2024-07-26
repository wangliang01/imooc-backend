## 当被提交到远程的文件，现在突然不想被提交了，想添加到忽略列表.gitignore中，发现不生效

```bash
git rm --cached -r .
git update-index --assume-unchanged <filename>
```
