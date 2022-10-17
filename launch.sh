CONFIG=$1
NAMESPACE=$2
PORT=$3
POD=`kubectl --kubeconfig $CONFIG get pods -n $NAMESPACE | grep -oE '10-control-panel-(.{10})-(.{5})'`

echo $NAMESPACE/$POD

kubectl --kubeconfig $CONFIG port-forward -n $NAMESPACE $POD $PORT:80