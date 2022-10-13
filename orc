if [ -z $(ls orc-utils |grep -F '_env') ];
then
    ./orc-utils/setup-venv.sh
fi

if [ -z $(ls -a|grep -F '.env') ];
then
  touch .env
  echo DATA_ROOT=./DATA > .env
fi

touch .orc.lock

./orc-utils/orc-python "$@"
