-- FUNCTION: public.DeleteAccount()

-- DROP FUNCTION public."DeleteAccount"() CASCADE;

CREATE FUNCTION public."DeleteAccount"()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	DELETE FROM public."Accounts" WHERE "accountUuid"=OLD.id;
	RETURN OLD;
END
$BODY$;

ALTER FUNCTION public."DeleteAccount"()
    OWNER TO postgres;



-- FUNCTION: public.DuplicateAccount()

-- DROP FUNCTION public."DuplicateAccount"() CASCADE;

CREATE FUNCTION public."DuplicateAccount"()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	INSERT INTO public."Accounts" VALUES (NEW.id, NEW.traits::json->'email', null, NOW(), NOW());
	RETURN NEW;
END
$BODY$;

ALTER FUNCTION public."DuplicateAccount"()
    OWNER TO postgres;




-- FUNCTION: public.UpdateAccount()

-- DROP FUNCTION public."UpdateAccount"() CASCADE;

CREATE FUNCTION public."UpdateAccount"()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	UPDATE public."Accounts" SET 
	email=NEW.traits::json->'email', 
	"updatedAt"=NOW()
	WHERE "accountUuid"=OLD.id;
	RETURN OLD;
END
$BODY$;

ALTER FUNCTION public."UpdateAccount"()
    OWNER TO postgres;


-- Trigger: DeleteAccount

-- DROP TRIGGER "DeleteAccount" ON public.identities;

CREATE TRIGGER "DeleteAccount"
    BEFORE DELETE
    ON public.identities
    FOR EACH ROW
    EXECUTE PROCEDURE public."DeleteAccount"();

-- Trigger: DuplicateAccount

-- DROP TRIGGER "DuplicateAccount" ON public.identities;

CREATE TRIGGER "DuplicateAccount"
    AFTER INSERT
    ON public.identities
    FOR EACH ROW
    EXECUTE PROCEDURE public."DuplicateAccount"();

-- Trigger: UpdateAccount

-- DROP TRIGGER "UpdateAccount" ON public.identities;

CREATE TRIGGER "UpdateAccount"
    BEFORE UPDATE 
    ON public.identities
    FOR EACH ROW
    EXECUTE PROCEDURE public."UpdateAccount"();

