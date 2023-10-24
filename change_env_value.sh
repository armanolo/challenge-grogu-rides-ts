if [ "$#" -ne 3 ]; then
    echo "Illegal number of parameters"
fi

haystack=$1
needle="$2="
newText="$needle$3"

#echo "$#" 
#echo "$0" 
#echo "$1" 
#echo "$2" 

if [ -f $haystack ]; then
    LINE=$(awk "/^$needle/{ print NR; exit}" $haystack)
    if [[ $LINE -gt 0 ]]; then
        sed -i "${LINE}i $newText" $haystack
        LINED=$((LINE+1))
        sed -i "${LINED}d" $haystack
    fi
fi