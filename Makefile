.PHONY: build-HelloWorldFunction

build-HelloWorldFunction:
	${MAKE} HANDLER=src/app.ts build-lambda-common

build-lambda-common:
	npm install
	rm -rf dist
	node_modules/esbuild/bin/esbuild ${HANDLER} --bundle --platform=node --target=es2022 --format=esm --out-extension:.js=.mjs --outdir=dist
	cp -r dist "${ARTIFACTS_DIR}/"

build-RuntimeDependenciesLayer:
	mkdir -p "${ARTIFACTS_DIR}/nodejs"
	cp package.json package-lock.json "${ARTIFACTS_DIR}/nodejs"
	npm install --production --prefix "${ARTIFACTS_DIR}/nodejs"
	rm "${ARTIFACTS_DIR}/nodejs/package.json" # to avoid rebuilding when changes don't relate to dependencies
