git fetch --all
for branch in $(git branch -r | grep -vE 'HEAD|master'); do
    git checkout --track $branch
done
