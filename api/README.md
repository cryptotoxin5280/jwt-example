# SMR Autonomy Controller REST API

The Autonomy Controller (AC) REST API is deployed on the SMR Autonomy Server as an OCI service container.

## Dependencies
To build and run the OCI container, the following dependencies must be met:

* podman
* buildah

### Installing Dependencies
As a convenience, the dependencies can be installed via Ansible playbook.

1. Install Ansible.
```
sudo apt-get install ansible
```

2. Execute the AC server dependency playbook located under "ansible/playbooks" directory in the "autonomy" repo.
```
ansible-playbook --connection=local autonomy-install-depends.yml
```

## Building the AC REST API Container
```
podman build ./api --tag sea-machines/api:development
```

## Running the AC REST API Container
```
podman run \
  --name api \
  -p 4000:4000 \
  --detach \
  sea-machines/api:development
```

## Accessing the AC REST API Documentation
Navigate to the following URL:
```
http://localhost:4000/api-docs
```
