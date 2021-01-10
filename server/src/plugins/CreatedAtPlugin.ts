import {
    Models,
    Repositories,
    Services,
    Plugin
} from "@eunovo/superbackend";


/**
 * Sets `createdAt` in all models upon creation
 */
export class CreatedAtPlugin extends Plugin {

    transformServices(models: Models, repos: Repositories, services: Services): void {
        Object.values(models)
            .forEach((model) => {
                const createdAtField = Object.values(model.fields)
                    .find((field) => field.name === 'createdAt');
                
                if (!createdAtField) return;

                services[model.name].pre('create', async (args) => {
                    args.input = { ...args.input, createdAt: new Date() };
                });
            });
    }

}
